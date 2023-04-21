# AskGPT

Introduction
A web application where the user can ask question to the ai related to the youtube video and get solve their query and question without the need to rewatch the video
It uses OpenAI Wishper API to generate the Transcript of the youtube video and langchain along with pinecone to create a vector store of documents using the open ai embeddings

Technologies Used
This application uses the following technologies:
OpenAI's Whisper API for generating transcripts and answering questions.
Pinecone for vector search.
Langchain for language translation.
MongoDB for storing data.
Express for server-side JavaScript.
React for client-side JavaScript.
Node.js for server-side JavaScript.

Installation

First we need to setup the backend, to change the current directory to the backend
cd backend

Then setup the backend by installing the required libaries
npm init

now we need to add environment variable that are API KEYs and passwords
for these create a .env file inside backend folder
and these these variables

OPENAI_API_KEY=""
PINECONE_API_KEY=""
PINECONE_ENV=""
PINECONE_INDEX=""
MONGODB_PASSWORD=""

now to you can the url of the youtube video you want to use

then getAudio.js file to download the audio of the youtube
node getAudio.js

now if the size of the audio is greater than 10MB it cannot be used to generate the transcript and the size for data to be send to the api request if limited to so run compressAudio.js
node compressAudio.js

once you have the audio ready run getTranscript.js to generate the transcript of the audio file
node getTranscript.js

now we need to create the Vector Store of Pinecone so run createVectorStore.js
node createVectorStore.js

now our backend setup is completed.
now you can run the server of following command
node server.js

once the server is setup we lanuch the frontend
for these open a new terminal windows or tab
and navigate to the root of the project and then change directory to the frontend
cd frontend
now setup the react libararies by running the following code
npm init

once all library are installed run
npm start
