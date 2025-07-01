import { createContext, useState } from "react";
import fetchData from "./service/fectchData";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export const ContextDrawing = createContext();
export const ContextDrawingProvider = ({ children }) => {
  const [dictionaryDrawings, setDictionaryDrawings] = useState({});
  const limit = 2;
  const addDrawing = async (categoryId, lastDrawing) => {
    try {
      const current = dictionaryDrawings[categoryId] || {
        lastDrawing: 0,
        list: [],
        fetchComplete: false
      };
      if (current.fetchComplete) {
        return current.list;
      }
      const data = await fetchData(`drawings/${categoryId}?lastDrawing=${lastDrawing}&limit=${limit}`);
      const newList = [...current.list, ...data];

      setDictionaryDrawings(prev => ({
        ...prev,
        [categoryId]: {
          lastDrawing: lastDrawing + data.length,
          list: newList,
          fetchComplete: data.length < limit
        }
      }));
      return newList;
    }
    catch (err) {
    }
  }
  const deleteDrawing = async (drawing) => {
    try {
        await fetchData(`drawings/${drawing.ID}`, 'DELETE');
        setDictionaryDrawings(prev => {
          const updated = { ...prev };
          const category = updated[drawing.CategoryID];
          if (category) {
            const newList = category.list.filter(d => d.ID !== drawing.ID);
            updated[drawing.CategoryID] = {
              ...category,
              list: newList
            };
          }
          console.log("Updated dictionaryDrawings", updated);
          return updated;
        });
      }
    catch (err) {
    }
  }
  const updateGeneralField = async (drawing, field, value) => {
    try {
      await fetchData(`drawings/${field}/${drawing.ID}`, 'PUT', { [field]: value });
      toast.success("Updated");
      console.log(value, field);
      setDictionaryDrawings(prev => {
        const updated = { ...prev };
        const catId = drawing.CategoryID;
        if (updated[catId]) {
          const updatedlist = updated[catId].list.map(d => {
            if (d.ID === drawing.ID) {
              return { ...d, [field]: value };
            }
            return d;
          });
          updated[catId] = { ...updated[catId], list: updatedlist };
        }
        return updated;
      });
    }
    catch (err) {
    }
  }
  const updateCategory = async (drawing, categoryId) => {
    const oldCategoryId = drawing.CategoryID;
    const newCategoryId = categoryId;
    try {
      await fetchData(`drawings/Category/${drawing.ID}`, 'PUT', { CategoryId: newCategoryId });

      setDictionaryDrawings(prev => {
        const updated = { ...prev };
        if (updated[oldCategoryId]) {
          updated[oldCategoryId] = {
            ...updated[oldCategoryId],
            list: updated[oldCategoryId].list.filter(d => d.ID !== drawing.ID)
          };
        }

        if (updated[newCategoryId]) {
          updated[newCategoryId] = {
            ...updated[newCategoryId],
            list: [...updated[newCategoryId].list, { ...drawing, CategoryId: newCategoryId }]
          };
          return updated;
        }
      });
    }
    catch (err) {}
  }
  return (
    <ContextDrawing.Provider value={{ dictionaryDrawings, addDrawing, setDictionaryDrawings, deleteDrawing, updateGeneralField, updateCategory }}>
      {children}
    </ContextDrawing.Provider>
  );
};