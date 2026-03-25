import clsx from 'clsx';

export default function Input({ className, ...props }) {
  return (
    <input
      className={clsx(
        'w-full rounded-2xl border border-black/10 bg-white/90 px-4 py-3 text-sm text-slate-800 outline-none ring-luxury-gold/50 placeholder:text-slate-500 focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/50',
        className
      )}
      {...props}
    />
  );
}
