module Concerns::Blobed
  extend ActiveSupport::Concern

  UPLOAD_DIR = Rails.root.join("uploads")
  MAX_FILE_SIZE = 1024 * 1024 * 24


  def save_file(io)   
    size = io.tempfile.stat.size
    raise AppError.new I18n.t "errors.file.size" unless size_ok? size

    blob = Blob.create!(
      name: io.original_filename.chomp,
      mime_type: io.content_type.chomp,
      size: size)

    path = make_blob_dir(blob.token)
    begin
      File.open(path.join(io.original_filename), 'wb') do |file|
        file.write(io.read)
      end
    rescue => e
      logger.error "[Error] #{e.class.name}, #{e.message}"

      # エラー処理
      rm_blob_dir(token)
      blob.destroy
      blob = nil
    end

    io.close(true)
    io = nil

    unless blob
      raise AppError.new I18n.t "errors.file.save"
    end
    return blob
  end

  def image_file?(content_type)
    ['image/jpeg', 'image/gif', 'image/png'].include? content_type
  end

  def size_ok?(size)
    MAX_FILE_SIZE >= size
  end


  private

  def make_blob_dir(token)
    path = Samepot::Application.config.upload_path.join(token)
    FileUtils.mkdir_p(path) unless FileTest.exist?(path)
    return path
  end

  def rm_blob_dir(token)
    path = Samepot::Application.config.upload_path.join(token)
    FileUtils.rm_r(path) if FileTest.exist?(path)
  end
end
