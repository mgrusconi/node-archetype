FROM node:10.1.0

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./entrypoint.sh /
CMD ["/entrypoint.sh"]