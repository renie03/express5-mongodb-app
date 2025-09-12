const transactions = [
  {
    id: 1,
    name: "John Doe",
    img: "/noavatar.png",
    status: "pending",
    date: "Jan 1 2025",
    amount: 3000,
  },
  {
    id: 2,
    name: "John Doe",
    img: "/noavatar.png",
    status: "done",
    date: "Jan 1 2025",
    amount: 3000,
  },
  {
    id: 3,
    name: "John Doe",
    img: "/noavatar.png",
    status: "cancelled",
    date: "Jan 1 2025",
    amount: 3000,
  },
  {
    id: 4,
    name: "John Doe",
    img: "/noavatar.png",
    status: "pending",
    date: "Jan 1 2025",
    amount: 3000,
  },
  {
    id: 5,
    name: "John Doe",
    img: "/noavatar.png",
    status: "done",
    date: "Jan 1 2025",
    amount: 3000,
  },
];

const Transactions = () => {
  return (
    <div className="bg-bgSoft p-5 rounded-xl">
      <h2 className="text-xl text-textSoft mb-3">Latest Transactions</h2>
      <table className="w-full border-separate border-spacing-3">
        <thead>
          <tr className="text-left">
            <th>Name</th>
            <th className="hidden lg:table-cell">Status</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={item.img || "/noavatar.png"}
                    alt=""
                  />
                  {item.name}
                </div>
              </td>
              <td className="hidden lg:table-cell">
                <span
                  className={`${
                    item.status === "pending"
                      ? "bg-orange-500 dark:bg-orange-700"
                      : item.status === "done"
                      ? "bg-gray-500 dark:bg-gray-700"
                      : "bg-red-500 dark:bg-red-700"
                  } px-1 py-0.5 rounded-md text-white`}
                >
                  {item.status}
                </span>
              </td>
              <td>{item.date}</td>
              <td>${item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
