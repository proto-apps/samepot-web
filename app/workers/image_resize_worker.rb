class ImageResizeWorker
  include Sidekiq::Worker

  # 画像リサイズ
  #   3種類(18x18, 24x24, 48x48)
  # uploads/:tokenに保存
  def perform(id, model={})
    return unless id.present? and model["model_name"] and model["model_id"]

    blob = Blob.find_by(id: id)
    return unless blob.present?

    failure = false
    path = Samepot::Application.config.upload_path.join(blob.token)

    begin
      image = MiniMagick::Image.open path.join(blob.name)

      # 3種類にリサイズして保存
      image.resize "48x48"
      image.write path.join("LARGE." + blob.name)
      image.resize "24x24"
      image.write path.join("MEDIUM." + blob.name)
      image.resize "18x18"
      image.write path.join("SMALL." + blob.name)
    rescue => e
      logger.error "[Error] #{e.message}"
      failure = true
      FileUtils.rm_r(path) if FileTest.exist?(path)
      blob.destroy
    end

    return if failure

    begin
      klass = model["model_name"].classify.constantize
      ins = klass.find(model["model_id"])
      ins.image_token = blob.token
      ins.save!
    rescue => e
      logger.error "[Error] #{e.message}"
      FileUtils.rm_r(path) if FileTest.exist?(path)
      blob.destroy unless blob.destroyed?
    end
  end
end
