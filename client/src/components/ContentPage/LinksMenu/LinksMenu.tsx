import React, {useMemo, useState} from 'react';
import {Menu, Space} from 'antd'
import {DownOutlined, HomeOutlined, PushpinOutlined, SnippetsOutlined, UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {useGetPinedNotesQuery} from "../../../services/notesService";
import PinedNote from "../PinedNote/PinedNote";

const StyledLinksMenu = styled(Menu)`
  background-color: transparent !important;
  border: transparent;

  a,
  .ant-menu-item {
    color: white
  }
;

  .ant-menu-item:hover {
    color: #196AD9;
  }

  ul {
    background: transparent !important;
  }

  ul > li[data-menu-id$=-more] {
    height: 10px !important;
  }
`

const LoadMoreButton = styled(DownOutlined)`
  * {
    position: relative;
    left: 30px;
    font-size: 2.2em;
  }
`

const LinksMenu = () => {
    const [limit, setLimit] = useState(5);
    const {data: pinedNotes, isFetching, isError} = useGetPinedNotesQuery({limit});
    const menuItems = useMemo(() => [
        {
            label: <Space>
                <HomeOutlined/>
                <Link to={"/main"}>Main</Link>
            </Space>,
            key: 1
        },
        {
            label: <Space>
                <PushpinOutlined/>
                Pined
            </Space>,
            key: 2,
            children: isError || !pinedNotes ? null : [...pinedNotes.notes.map(note => ({
                label: <PinedNote note={note}/>,
                key: note._id
            })), pinedNotes.isMoreNotes && {
                label: <LoadMoreButton  id="load-more" onClick={() => setLimit((prev) => prev + 5)}/>,
                key: "more"
            }]
        },
        {
            label: <Space>
                <SnippetsOutlined/>
                <Link to={"/notes"}>Notes</Link>
            </Space>,
            key: 3
        },
        {
            label: <Space>
                <UserOutlined/>
                <Link to={"/share"}>Shared</Link>
            </Space>,
            key: 4
        },

    ], [pinedNotes, isError]);

    return <StyledLinksMenu selectable={false} theme="dark" items={menuItems} mode="inline"/>
};

export default LinksMenu;