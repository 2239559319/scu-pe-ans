import React, { useState } from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './search.less';

type Ans = {
  ans: string;
  type: string;
  title: string;
  options: string;
};

async function getList(searchText: string): Promise<Ans[]> {

  const list = (await import('../public/ans.json')).default;

  const res = list.filter((v) => v.title.includes(searchText)); 

  return res;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [ansList, setAnsList] = useState<Ans[]>([]);

  const handleSearch = async () => {
    const res = await getList(searchTerm);
    setAnsList(res);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <div className="search-input">
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <TextField
            fullWidth={true}
            autoComplete="off"
            variant="outlined"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ width: '500px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearch}
                    sx={{
                      outline: 'none',
                      '&:focus': {
                        outline: 'none',
                      },
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </div>

      <div className="search-list">
        {ansList.map((v, i) => {
          const { ans, options, title, type } = v;

          return (
            <div key={i} className="search-list-item">
              <div className="search-list-item-title">
                <span>题目 </span> {title}
              </div>
              <div className="search-list-item-type">
                <span>类型 </span>
                {type}
              </div>
              <div className="search-list-item-options">
                <div>选项</div>
                <div className="search-list-item-options-val">{options}</div>
              </div>
              <div className="search-list-item-ans">
                <span>答案 </span> {ans}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
