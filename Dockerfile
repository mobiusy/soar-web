FROM node:14.16-alpine3.10
LABEL name="soar-web"

EXPOSE 7777

RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime  && echo 'Asia/Shanghai' >/etc/timezone

# USER node
WORKDIR /app

RUN wget https://github.com/XiaoMi/soar/releases/download/0.9.0/soar.linux-amd64 -O soar

COPY ./ ./
RUN chmod a+x ./soar

CMD ["node", "index.js"]
