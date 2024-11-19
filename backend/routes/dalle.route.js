import express from "express";
import { OpenAI } from "openai";

const router = express.Router();

// const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// router.route("/").get((req, res) => {
//   //   console.log("routing");
//   res.send("Hello  from Dall-E");
// });
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    res.status(500).send(error?.response?.data.error.message);
  }
});
export default router;
