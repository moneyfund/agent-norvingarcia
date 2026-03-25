import clsx from 'clsx';

export default function Button({ as: Component = 'button', className, variant = 'primary', ...props }) {
  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300',
        variant === 'primary' && 'bg-luxury-gold text-black hover:shadow-glow',
        variant === 'outline' &&
          'border border-black/20 bg-transparent text-slate-800 hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10',
        className
      )}
      {...props}
    />
  );
}
