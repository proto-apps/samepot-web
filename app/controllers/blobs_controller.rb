class BlobsController < ApplicationController

  def download_image
    obj = download_params
    obj[:size] = "small" unless ["large", "medium", "small"].include? obj[:size]

    image = Blob.find_by(token: obj[:token])
    filepath = Samepot::Application.config.upload_path.join(
      image.token, "#{obj[:size].upcase}.#{image.name}")

    File.open(filepath, 'rb') do |f|
      send_data(f.read, type: image.mime_type, disposition: "inline")
    end
  end


  private

  def download_params
    params.permit(:token, :size)
  end
end
