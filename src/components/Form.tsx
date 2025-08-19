import { useState } from "react";

const Form = () => {
    const [name, setName] = useState("");   // store input value
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.ReactElement<) => {
        e.preventDefault();
        console.log("Submitted:", { name, email });
    };


    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded">
            <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 m-2"
            />
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 m-2"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                Submit
            </button>
        </form>
    )
}

export default Form;