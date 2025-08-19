type taskNameProps = {
    taskName: string;
}

const Tasks = ({ taskName }: taskNameProps) => {
    return (
        <div className="flex justify-center mt-4">
            <div className="w-2xl">
                <div className=' flex justify-between items-center'>
                    <p>{taskName}</p>

                    <div className="flex justify-between gap-6">
                        <button className="">Edit</button>
                        <button className="">Delete</button>
                    </div>

                </div>
            </div>

        </div>

    )
}

export default Tasks;