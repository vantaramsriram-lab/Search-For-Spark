import logo from '../assets/logo/spark-logo.png';

/**
 * The official SPARK logo, used as-is.
 * The artwork ships on a near-black plate; `mix-blend-mode: screen`
 * dissolves that plate into any dark surface without touching the artwork.
 */
export default function Logo({ className = '', alt = 'SPARK — Programming × Robotics × Technology' }) {
  return (
    <img
      src={logo}
      alt={alt}
      draggable={false}
      className={`logo-blend select-none pointer-events-none ${className}`}
    />
  );
}
