import styles from './VideoPlayer.module.css'

export default function VideoPlayer() {
  return (
    <div className={styles.player}>
      <div className={styles.canvas}>
        <button type="button" className={styles.playBtn} aria-label="Play">
          <svg className={styles.playSvg} viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <div className={styles.controls}>
          <div className={styles.controlsLeft}>
            <button type="button" className={styles.ctrlBtn} aria-label="Play">
              <svg className={styles.ctrlIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <button type="button" className={styles.ctrlBtn} aria-label="Rewind 5s">
              <span className={styles.rewindIcon}>&#8630;5</span>
            </button>
            <button type="button" className={styles.ctrlBtn} aria-label="Forward 5s">
              <span className={styles.forwardIcon}>&#8631;5</span>
            </button>
            <button type="button" className={styles.ctrlBtn} aria-label="Volume">
              <svg className={styles.ctrlIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.5v7a4.49 4.49 0 0 0 2.5-3.5zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            </button>
            <span className={styles.time}>00:00 / 00:00</span>
          </div>

          <div className={styles.controlsRight}>
            <button type="button" className={styles.ctrlBtn} aria-label="Settings">
              <svg className={styles.ctrlIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z" />
              </svg>
            </button>
            <button type="button" className={styles.ctrlBtn} aria-label="Server">
              <svg className={styles.ctrlIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
              </svg>
            </button>
            <button type="button" className={styles.ctrlBtn} aria-label="Picture in picture">
              <svg className={styles.ctrlIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z" />
              </svg>
            </button>
            <button type="button" className={styles.ctrlBtn} aria-label="Fullscreen">
              <svg className={styles.ctrlIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
