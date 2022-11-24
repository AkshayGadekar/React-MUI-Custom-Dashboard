import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Heading from '../../components/utilities/Heading';
import IndexListing from "./components/IndexListing";
import Breadcrumb from "../../components/utilities/Breadcrumb";
import {log} from "../../funcs/helpers";
import TableSkeleton from '../../components/skeletons/TableSkeleton';
import withAxios from '../../HOC/withAxios';
import type {MessagesIndexProps} from "../../types/pages";
import menu from "../../objects/menu";
import Add from "./components/Add";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const Index = (props: MessagesIndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(true);
  const [messagesCreatedCount, setMessagesCreatedCount] = useState<number>(0);

  const userInfo = useAppSelector(state => state.user);

  const breadCrumb = menu[5].breadCrumb!;

  const messagesButton = {
    value: 'Add New',
    onClick: () => setOpenDialog(true)
  }

  const setParentState = { setSnackbarInfo: props.setSnackbarInfo, setShowSnackBar: props.setShowSnackBar, setMessagesCreatedCount };

  useEffect(() => {

    const requestController = new AbortController();
    
    props.authAxios({...props.apiEndPoints.messages.list, params: data, signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setData(successResponse);
        setIsLoading(false);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })

    return () => {
      requestController.abort('Request aborted to clean up useEffect.');
    }
  }, []);
  
  log('Messaging rendered');

  return (
    <Box>
      {
        isLoading
        ?
        <TableSkeleton />
        :
        <>
          <Breadcrumb path={breadCrumb} />
          <Heading title="Messages" button={messagesButton} />
          <Add open={openDialog} close={() => setOpenDialog(false)} setParentState={setParentState} />
          {/* <IndexListing data={data} /> */}
        </>
      }
    </Box>
  )
}

export default withAxios<MessagesIndexProps>(Index);