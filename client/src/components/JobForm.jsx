import {useState} from "react";

export default function JobForm() {
  const [form, setForm] = useState({
    jobname: "",
    description: "",
    npcname: "",
    difficulty: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log("Sucessfully Submitted.");
    // console.log(form);
    // API Call here to add data to database.
    const formData = new FormData(event.target);
    const formValues = Object.fromEntries(formData);
    const response = await fetch("http://localhost:8080/quests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    setForm({
      jobname: "",
      description: "",
      npcname: "",
      difficulty: "",
    });
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <form className="jobform" onSubmit={handleSubmit}>
      <input
        name="jobname"
        type="text"
        placeholder="Job Name"
        required
        onChange={handleChange}
        value={form.jobname}
      />
      <textarea
        name="description"
        cols="35"
        rows="5"
        placeholder="Detail what you need doing..."
        required
        onChange={handleChange}
        value={form.description}></textarea>
      <input
        name="npcname"
        type="text"
        placeholder="Your Name"
        required
        onChange={handleChange}
        value={form.npcname}
      />
      <label htmlFor="difficulty">Difficulty:</label>
      <select
        name="difficulty"
        id="difficulty"
        required
        onChange={handleChange}
        value={form.difficulty}>
        <option value="" defaultValue={"Select One..."}>
          Select one...
        </option>
        <option value="Easy">Easy</option>
        <option value="Moderate">Moderate</option>
        <option value="Hard">Hard</option>
        <option value="Insane">Insane</option>
      </select>
      <button>Add Job</button>
    </form>
  );
}
