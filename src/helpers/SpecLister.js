function SpecLister (spec) {
    return (
        spec?.map((list, index) => {
            return (
                index === 0 ?
                `${list.name}` :
                    `, ${list.name}`
            )
        })
    );
}

export default SpecLister;