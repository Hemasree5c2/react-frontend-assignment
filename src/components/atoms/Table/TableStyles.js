import styled from "styled-components";

export const Styles = styled.div`
  .table {
    border: 1px solid #ddd;
    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }
    .th,
    .td {
      padding: 16px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;
      overflow: hidden;
      :last-child {
        border-right: 0;
      }
    }
    &.sticky {
      overflow: auto;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
        width: fit-content;
      }
      .header {
        top: 0;
        box-shadow: 0px 3px 3px #ccc;
      }
      .body {
        position: relative;
        z-index: 0;
      }
    }
  }
`;
