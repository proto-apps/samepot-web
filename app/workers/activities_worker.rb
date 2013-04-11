class ActivitiesWorker
  include Sidekiq::Worker

  def perform(obj = {})
    begin
      activity = Activity.create!(obj)
      $redis_publisher.publish("activity", activity.to_json)
    rescue => e
      logger.error "[Error] #{e.class.name}, #{e.message}"
    end
  end
end
