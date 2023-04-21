# AskGPT
<div align="center">
<img src="https://raw.githubusercontent.com/bhokaremoin/AskGPT/main/backend/img/ask-gpt.jpg" />
</div>

## Introduction
AskGPT is Web Application where the user can ask AI question related to a Youtube Video and AI answers based on the transcript of that video. Curently the Youtube video based on which it answers is [video](https://www.youtube.com/watch?v=oL1uem6-3m4).

[Website Live](https://askgpt-ize0.onrender.com/)
## Technologies Used
This application uses the following technologies:
### BACKEND
* ffmpeg library to generate audio file of the Youtube video.
* OpenAI's Whisper API for generating transcripts from the audio file.
* Pinecone for creating vector store and performing vector search.
* Langchain to integrate OpenAI APIs and Pinecone database.
* OpenAI's LLM's Chains to generate answer in Natural Language.

### Web Development
* MongoDB for storing data.
* Express for server-side JavaScript.
* React for client-side JavaScript.
* Node.js for server-side JavaScript.

## Setup

Clone this repo into your local environment:
```bash
git clone https://github.com/bhokaremoin/AskGPT.git
```

### Backend
Change Directory to Backend
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file to assignment environment variable using:
```bash
touch .env
```

Open `.env` in your editor and paste below variable name:

```bash
OPENAI_API_KEY=""
PINECONE_API_KEY=""
PINECONE_ENV=""
PINECONE_INDEX=""
MONGODB_URL=""
```
You can get these values from below provided links
<hr />

SignUp at OpenAI [here](https://platform.openai.com/signup) and create OpenAI API key [Get Key](https://platform.openai.com/account/api-keys).
SignUp at Pinecone: [here](https://www.pinecone.io/) and Get Pinecone API key and environment by navigating to API Keys tab in Pinecone Console.

<div>
<img src="https://raw.githubusercontent.com/bhokaremoin/AskGPT/main/backend/img/api_key.jpg" />
</div>

Create Pinecone Index by clicking on the Create Index with your Index Name.<br>

Set dimensions to `1536` `.env` and Pod Type to `P1`.
<div>
<img src="https://raw.githubusercontent.com/bhokaremoin/AskGPT/main/backend/img/create_index.jpg" />
</div>
Create a cluster on mongoDB, the tutorial for cluster is given [here](https://www.mongodb.com/basics/clusters/mongodb-cluster-setup).


Now to get audio of the Youtube video and generate the transcript of it and setup the vector store of the transcript, run `setup.js` file
<hr />
You Can change the Youtube Video URL to your video by.


Changing the `videoURL` variable in line 6 in `backend/transcriptSetup/getAudio.js`.
<div>
  <img src="https://raw.githubusercontent.com/bhokaremoin/AskGPT/main/backend/img/youtube_url.jpg" />
  </div>
<hr />
```bash
node setup.js
```

Now launch the `server`
```bash
node server.js
```
<hr />

### Frontend

Open new terminal and go to the root directory of the repo and change it to frontend
```bash
cd frontend
```

Install dependencies
```bash
npm install
```

Launch the frontend UI
```bash
npm start
```
The website will be running on [localhost:3000](http://localhost:3000).

## Contact
For any suggestions or technical related question feel free to connect with me.
* [Linkedin](https://www.linkedin.com/in/moin-bhokare-722b601b0/)
* [moinbhokare7@gmail.com](mailto:moinbhokare7@gmail.com)
