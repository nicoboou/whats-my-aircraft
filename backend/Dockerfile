
FROM python:3.8.3-slim

RUN apt-get update && apt-get install -y postgresql build-essential libpq-dev ffmpeg libsm6 libxext6 libgl1-mesa-glx python3-pip git zip curl htop libglib2.0-0 libpython3-dev
RUN /bin/sh -c python3 -m pip install --upgrade pip wheel

COPY ./requirements.txt ./requirements.txt

RUN pip install --upgrade pip && pip install -r requirements.txt albumentations gsutil notebook coremltools onnx onnx-simplifier onnxruntime tensorflow-cpu tensorflowjs --extra-index-url https://download.pytorch.org/whl/cpu

WORKDIR /usr/src/app

RUN git clone https://github.com/ultralytics/yolov5 /usr/src/app
COPY ./app .

COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]
