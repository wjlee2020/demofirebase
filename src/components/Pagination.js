export default function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <nav style={{width: '200px', margin: '2rem auto'}}>
            <ul style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', margin: 0, padding: 0}}>
                {pageNumbers.map((pageNum, i) => (
                    <li style={{listStyleType: 'none', marginBottom: '3em'}} key={i}>
                        <span style={{textDecoration: 'none', borderBottom: '1px solid', padding: '.2rem .7rem', cursor: 'pointer'}} onClick={() => paginate(pageNum)}>
                            {pageNum}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}