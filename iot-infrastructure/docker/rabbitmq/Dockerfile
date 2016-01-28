FROM rabbitmq:3.5.6-management
MAINTAINER Steven Maasch <maasch@stevenmaasch.de>

COPY rabbitmq.config /etc/rabbitmq/

RUN rabbitmq-plugins enable --offline rabbitmq_web_stomp

EXPOSE 15674
