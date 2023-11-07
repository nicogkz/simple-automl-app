FROM continuumio/miniconda3:latest

ENV PATH=/miniconda/bin:${PATH}
RUN echo $PATH

RUN conda update conda --yes
RUN conda config --add channels conda-forge

# Working directory in the container
WORKDIR /app

COPY automl-env.yml .

# Create the Conda env and install the deps from automl-env.yml
RUN conda env create -f automl-env.yml

# activate the Conda env
SHELL ["conda", "run", "-n", "automl-env", "/bin/bash", "-c"]

# Copy the rest of the app sources into the Docker container
COPY . .

EXPOSE 5000
# Entry point
ENTRYPOINT ["python"]
CMD ["api.py"]
