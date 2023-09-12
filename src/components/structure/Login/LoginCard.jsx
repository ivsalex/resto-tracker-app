import React from "react";
import Button from "../../elements/Button";

function LoginCard({ handleSubmit, errorMessage, setEmail, setPassword }) {
    return (
        <div className="flex items-center justify-center m-12">
            <div className="bg-white p-8 my-20 shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Enter your username"
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 p-2 border rounded w-full"
                            placeholder="Enter your password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    <Button className="w-full">Sign in</Button>
                </form>
            </div>
        </div>
    )
};

export default LoginCard;