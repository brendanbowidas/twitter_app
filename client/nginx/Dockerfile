# docker-compose build nginx && docker-compose up -d nginx
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

ADD sites-enabled/site.conf /etc/nginx/conf.d/site.conf

COPY build /usr/share/nginx/html

# Append "daemon off;" to beginning of config
# to avoid container exiting
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

EXPOSE 80

CMD service nginx start
