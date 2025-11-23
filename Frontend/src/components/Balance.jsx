
export const Balance = ({ balance }) => {
    return (
        <div className="flex items-center text-lg font-bold px-8 mt-6">
            <div className="mr-2">
                Your Balance
            </div>
            <div>
                $ {balance}
            </div>
        </div>
    );
};