import { getPrisma } from "@/lib/db";
// Import the Enum directly from Prisma to avoid the type mismatch
import { Order_Status } from "@/generated/prisma/enums";
import {
  FiPackage,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import Image from "next/image";

export default async function AdminOrdersPage() {
  const orders = await getPrisma().order.findMany({
    include: {
      user: true,
      orderItems: { include: { cloth: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const getStatusInfo = (status: Order_Status) => {
    switch (status) {
      case Order_Status.PENDING:
        return {
          style: "bg-amber-50 text-amber-700 border-amber-200",
          icon: FiClock,
        };
      case Order_Status.ATTENDING:
        return {
          style: "bg-rose-50 text-rose-700 border-rose-200",
          icon: FiPackage,
        };
      case Order_Status.FULFILLED:
        return {
          style: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: FiCheckCircle,
        };
      default:
        return {
          style: "bg-gray-50 text-gray-700 border-gray-200",
          icon: FiAlertCircle,
        };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-darkRose2 uppercase tracking-tight">
              Customer Orders
            </h1>
            <p className="text-sm text-gray-500">
              Manage and track all incoming requests
            </p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-rose-100 flex items-center gap-3">
            <FiPackage className="text-rose-600" />
            <span className="text-sm font-bold text-darkRose2">
              {orders.length} Total Orders
            </span>
          </div>
        </header>

        <div className="bg-white rounded-2xl shadow-xl shadow-rose-900/5 border border-rose-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-rose-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                    Items
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                    Total
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {orders.map((order) => {
                  const { style, icon: StatusIcon } = getStatusInfo(
                    order.status,
                  );

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-rose-50/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-darkRose2">
                          {order.user.firstname} {order.user.surname}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          {order.orderItems.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="relative h-8 w-8 rounded-full border-2 border-white overflow-hidden shadow-sm"
                            >
                              <Image
                                src={item.cloth.imageUrl}
                                alt="item"
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {order.orderItems.length > 3 && (
                            <div className="h-8 w-8 rounded-full bg-rose-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-rose-600">
                              +{order.orderItems.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-rose-900">
                        NGN{" "}
                        {order.orderItems
                          .reduce(
                            (acc, item) =>
                              acc + item.priceAtPurchase * item.quantity,
                            0,
                          )
                          .toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center gap-2 px-3 py-1 rounded-full border w-fit ${style}`}
                        >
                          <StatusIcon className="text-xs" />
                          <span className="text-[10px] font-black uppercase tracking-tighter">
                            {order.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-xs text-gray-500 font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-medium tracking-wide">
                No customer orders found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
