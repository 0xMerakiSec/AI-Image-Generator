import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { Loader, FormField } from "../components";
function CreatePost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generating, setGenerating] = useState(false);
  const [loading, setLoading] = useState(false);
  async function generateImage() {
    if (form.prompt) {
      try {
        setGenerating(true);
        const response = await fetch("http://localhost:8000/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGenerating(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSurpriseMe() {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  }
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning images genrated through
          Dall-E AI and share them with the community
        </p>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            placeholder="Bob ross"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="teddy bears shopping for groceries in Japan, ukiyo-e"
            value={form.prompt}
            handleChange={handleChange}
            handleSurpriseMe={handleSurpriseMe}
            isSurpriseMe
          />
          <div className="relative bg-gray-50 border border-gray-300 textgray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generating && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg ">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5  flex gap-5">
          <button
            type="submit"
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full am:w-auto px-5 py-2.5 text-center"
            onClick={generateImage}
          >
            {generating ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] test-[14px]">
            Once you have created the image you want, You can share it with
            others in the community
          </p>
          <button
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md w-full sm:w-auto px-5 py-2.5 text-center"
            type="submit"
          >
            {loading ? "Sharing..." : "Share with the community"}{" "}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
