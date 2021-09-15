# stop running docker if it exists
if test ! -z "$(docker ps -q -f name=nottodolist)"
  then sudo docker stop nottodolist
fi
if test ! -z "$(docker ps -aq -f name=nottodolist)"
  then sudo docker rm nottodolist
fi
# remove image if exists
if test ! -z "$(docker images -q nottodolist)"
  then sudo docker rmi nottodolist
fi
# build and run docker images
sudo docker build -t nottodolist .
sudo docker run --name nottodolist -d -p 80:80 nottodolist

