# MongoDB 2.6
if [[ ! -d ~/mongodb-linux-x86_64-2.6.4 ]]; then cd ~; wget http://downloads.mongodb.org/linux/mongodb-linux-x86_64-2.6.4.tgz && tar xvzf ~/mongodb-linux-x86_64-2.6.4.tgz; fi
sudo /etc/init.d/mongodb stop
sudo cp ~/mongodb-linux-x86_64-2.6.4/bin/* /usr/bin
sudo /etc/init.d/mongodb start