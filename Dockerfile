FROM ubuntu


EXPOSE 3000 27017

RUN apt-get -q update && apt-get install -y -qq \
  git \
  curl \
  ssh \
  sudo \	
  build-essential \
  apt-utils \
  && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - \
  && apt-get install -y -q nodejs \
  && apt-get clean \
&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


RUN mkdir -p /usr/src/app
WORKDIR /user/src/app
RUN cd /user/src/app
# git clone 
RUN git init
RUN git remote add origin https://github.com/fdxshadow/pacientes-crh.git 
RUN git fetch
RUN git checkout master


ENV dbhost = localhost

CMD ["npm","start","$dbhost"]
