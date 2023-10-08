import { styled } from '@mui/system';

const LayoutContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '64px'
});

const ContentArea = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
});

const MainLayout = ({ children }) => {
    return (
        <LayoutContainer>
            <ContentArea>
                {children}
            </ContentArea>
        </LayoutContainer>
    );
};

export default MainLayout;

