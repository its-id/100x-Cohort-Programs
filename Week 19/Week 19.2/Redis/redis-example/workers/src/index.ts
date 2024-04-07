import { createClient } from 'redis';
const client = createClient();

async function processSubmission(submission: string) {
  const { problemId, code, language } = JSON.parse(submission);

  console.log(`Processing submission for problem: {
    problemId: ${problemId},
    code: ${code},
    language: ${language}
  }`);
  // Here you would add your actual processing logic

  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log(`Finished processing submission for problemId ${problemId}.`);
}

async function startWorker() {
  try {
    await client.connect();
    console.log('Worker connected to Redis.');

    // Main loop (Simulating Polling)
    while (true) {
      try {
        //pop the rightmost element from the 'problems' queue
        const submission = await client.brPop('problems', 0);

        // @ts-ignore
        //process the submission (push it pub/sub workers, )
        await processSubmission(submission.element);
      } catch (error) {
        console.error('Error processing submission:', error);
        // Implement your error handling logic here. For example, you might want to push
        // the submission back onto the queue or log the error to a file.
      }
    }
  } catch (error) {
    console.error('Failed to connect to Redis', error);
  }
}

startWorker();
