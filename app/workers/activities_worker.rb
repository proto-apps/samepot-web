class ActivitiesWorker
  include Sidekiq::Worker

  def perform(obj = {})
    begin
      activity = Activity.create!(obj)
    rescue => e
      logger.error "[Error] #{e.class.name}, #{e.message}"
    end
  end
end
