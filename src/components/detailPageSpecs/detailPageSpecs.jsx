import styles from './detailPageSpecs.module.css'


function gameSpecs ({title, contents}) {
    return (
        <article className={styles['detail']}>
            <h2 className={styles['detail_header']}>
                {title}
            </h2>
            <p className={styles['detail_content']}>
                {contents}
            </p>
        </article>
    )
}

export default gameSpecs;