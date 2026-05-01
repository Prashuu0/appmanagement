import { motion } from "framer-motion";

const StatCard = ({ title, value, accent }) => (
  <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
    <p className="text-sm text-slate-500 dark:text-slate-300">{title}</p>
    <p className={`mt-2 text-3xl font-bold ${accent}`}>{value}</p>
  </motion.div>
);

export default StatCard;
