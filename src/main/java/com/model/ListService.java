package com.model;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListService {
    @Autowired
    ListRepository listRepository;

    public ListEntry getListWithName(String listName) {
        return  listRepository.findByListName(listName);
    }

    public ListEntry saveList(ListEntry list) {
        return listRepository.save(list);
    }
}
