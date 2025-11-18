
'use client';
import React from 'react';
import {Paperclip,AtSign,Box,Settings} from 'lucide-react';

export const Toolbar=()=>(
  <div className="toolbar-icons">
    <Paperclip className="toolbar-icon"/>
    <AtSign className="toolbar-icon"/>
    <Box className="toolbar-icon"/>
    <Settings className="toolbar-icon"/>
  </div>
);
