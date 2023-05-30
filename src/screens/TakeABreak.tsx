import useStore from "../store";

function TakeABreak() {
    const [ setScreen ] = useStore((state) => [
        state.setScreen,
      ]);
    return (
        <main className="flex min-h-screen flex-col items-center text-black p-5">
            <div className="w-full items-center justify-center">
                <p className="font-bold text-base text-gray-900 text-center">
                    How long will your break be?
                </p>
            </div>
            <div className="flex w-full flex-row items-center justify-center p-6">
                <div className="flex flex-1 items-end justify-end mr-1">
                    <div className="flex-none border rounded items-center justify-center">
                        <div className="p-2.5">
                            <p className="text-center text-gray-900 font-bold text-3xl">
                                00
                            </p>
                        </div>
                        <p className="text-center text-gray-400 text-base text-xs pb-1">
                            hr
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 ml-1">
                    <div className="flex-none border rounded items-center justify-center">
                        <div className="p-2.5">
                            <p className="text-center text-gray-900 font-bold text-3xl">
                                15
                            </p>
                        </div>
                        <p className="text-center text-gray-400 text-base text-xs pb-1">
                            min
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="w-full items-center justify-center flex"
            >
                <button
                    className="bg-white py-2 border border-sky-400 rounded flex-none text-sky-400 font-medium text-base w-3/12"
                    onClick={() => setScreen("Main")}
                >
                    Cancel
                </button>
                <div className="w-5" />
                <button
                    className="bg-sky-400 py-2 rounded flex-none text-white font-medium text-base w-3/12"
                    // onClick={() => router.back()}
                >
                    Okay
                </button>
            </div>
        </main>
    )
}

export default TakeABreak;