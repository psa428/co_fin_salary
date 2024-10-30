import PropTypes from 'prop-types'; 
import styled from "styled-components";

const TableRowContainer = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

export const TableRow = styled(TableRowContainer)`
    display: flex;
    align-items:    center;
    border: ${({ border }) => (border ? '1px solid #007889' : 'none')};

    & > div {
        display:    flex;
        padding:    0 10px;
    
    }
 
`;
TableRow.propTypes = {
    children:   PropTypes.node.isRequired,
}