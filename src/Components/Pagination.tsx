import styled from 'styled-components';

interface Pagination {
  currPage: number;
  totalPages: number;
  setCurrPage: (newValue: number) => void;
}

enum ButtonTrigger {
  NEXTBUTTON = 'nextButton',
  PREVBUTTON = 'prevButton',
  PAGINATIONBUTTON = 'paginationButton',
}

const BaseButton = styled.button`
  padding: 12px 16px;
  font-size: 20px;
  text-underline-offset: 4px;
  &:hover {
    text-decoration: underline;
  }
  &:disabled {
    background-color: transparent;
    pointer-events: none;
  }
`;
const PaginationContainer = styled.div`
  background-color: #fafafa;
  margin-top: 24px;
  display: flex;
  border-radius: 4px;
  margin-top: auto;
`;

const PreviousButton = styled(BaseButton)<{ $currPage?: number }>``;

const NextButton = styled(BaseButton)<{ $currPage?: number }>``;

const PaginationButton = styled(BaseButton)<{ $isCurrPage?: boolean }>`
  ${(props) =>
    props.$isCurrPage && {
      backgroundColor: '#00bcd4',
      pointerEvents: 'none',
    }}
  padding: 12px 12px;
`;

const Pagination = ({ currPage, totalPages, setCurrPage }: Pagination) => {
  const changePage = (newPage: number) => {
    setCurrPage(newPage);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    if (totalPages > 1) {
      return (
        <PaginationContainer>
          <PreviousButton
            onClick={() => changePage(currPage - 1)}
            disabled={currPage <= 1}
          >
            Prev
          </PreviousButton>
          {pages.map((page, index) => (
            <PaginationButton
              onClick={() => changePage(index + 1)}
              $isCurrPage={currPage === index + 1}
              key={page}
            >
              {page}
            </PaginationButton>
          ))}
          <NextButton
            disabled={currPage === totalPages}
            onClick={() => changePage(currPage + 1)}
          >
            Next
          </NextButton>
        </PaginationContainer>
      );
    }
  };
  return <>{renderPagination()}</>;
};

export default Pagination;
