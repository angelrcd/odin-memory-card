import { useState } from "react";

interface AppProps {
    text: string;
}

function App({ text }: AppProps) {
    const [count, setCount] = useState(0);

    return (
        <>
            <div></div>
            <h1 className="text-red-400">{text}</h1>
            <div className="card">
                <button
                    onClick={() => {
                        setCount((count) => count + 1);
                    }}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
