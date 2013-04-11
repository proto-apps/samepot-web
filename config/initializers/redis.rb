#
# リアルタイムストリームサーバへのPublish用
# どこからでも参照できるようグローバルシンボルとする
#

redis_config = YAML.load_file(Rails.root + 'config/redis.yml')[Rails.env]
$redis_publisher = Redis.new(redis_config.to_hash)

# 本番環境では起動時にRedisと通信できるかチェック
$redis_publisher.ping if Rails.env.production?
