FROM python:latest

RUN apt update \
    && apt upgrade -y \
    && apt install -y sudo git \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -g 1000 devgroup \
    && useradd -u 1000 -g devgroup -m -s /bin/bash dev \
    && echo "dev ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

WORKDIR /workspace

RUN chown -R dev:devgroup /workspace

USER dev
