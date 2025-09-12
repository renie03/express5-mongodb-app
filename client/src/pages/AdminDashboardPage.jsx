import Card from "../components/admin/Card";
import Transactions from "../components/admin/Transactions";
import Chart from "../components/admin/Chart";

const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <Transactions />
      <Chart />
    </div>
  );
};

export default AdminDashboardPage;
