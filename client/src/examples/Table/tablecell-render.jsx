import React from "react";
import VuiBox from "components/VuiBox";
import VuiProgress from "components/VuiProgress";
import Label from "examples/Label";
import VuiTypography from "components/VuiTypography";

const renderTableCellContent = (key, value) => {
    switch (key) {

        case 'binLevel':
            let color = value < 35 ? 'success' : value < 75 ? 'warning' : 'error';
            return (
                <VuiBox display="flex" flexDirection="column" alignItems="flex-start">
                    <VuiBox width="100%">
                        <VuiProgress value={value} color={color} sx={{ background: "#2D2E5F" }} label={true} />
                    </VuiBox>
                </VuiBox>
            );

        case 'issueStatus':
            return (
                <Label color={value === 'Open' ? 'error' : (value === 'In Progress' ? 'warning' : 'success')}>{value}</Label>
            );

        default:
            return (
                <VuiTypography noWrap variant="inherit">{value}</VuiTypography>
            );
    }
};

export default renderTableCellContent;
