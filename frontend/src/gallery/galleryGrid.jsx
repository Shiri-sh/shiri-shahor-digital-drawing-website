import GalleryCardAdmin from "./galleryCardAdmin";
import GalleryCardUser from "./galleryCardUser";
import GalleryTabs from "./galleryTabs";
import "../css/galleryGrid.css";
import { useEffect, useState, useContext } from "react";
import Comments from "../comments/comments";
import { ContextDrawing } from "../contextDrawing";
import { ContextUser } from "../contextUser";
import { Ellipsis } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
const GalleryGrid = () => {
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [category, setCategory] = useState(3);
  const { dictionaryDrawings, addDrawing } = useContext(ContextDrawing);
  const { user } = useContext(ContextUser);

  const showNext = () => {
    setFullscreenIndex((prev) => (prev + 1) % (dictionaryDrawings[category]?.list?.length || 1));
  };

  const showPrev = () => {
    const length = dictionaryDrawings[category]?.list?.length || 1;
    setFullscreenIndex((prev) => (prev - 1 + length) % length);
  };

  const loadDrawings = async () => {
    await addDrawing(
      category,
      dictionaryDrawings[category]?.lastDrawing || 0,
      dictionaryDrawings[category]?.limit
    );
  };

  const loadInitialDrawings = async () => {
    if (!dictionaryDrawings[category]?.list?.length) {
      await addDrawing(category, 0);
    }
  };

  useEffect(() => {
    loadInitialDrawings();
  }, [category]);

  const currentDrawing = dictionaryDrawings[category]?.list?.[fullscreenIndex];
 console.log(dictionaryDrawings)
 
  return (
    <div className="galleryGrid">
      
      <ToastContainer />

      <GalleryTabs setCategory={setCategory} />
      <div className="galleryCardsWrapper">
        
        {dictionaryDrawings[category]?.list?.length === 0 && <h1>no drawings in this category</h1>}

        {dictionaryDrawings[category]?.list?.map((drawing, index) =>
          user?.role === "admin" ? (
            <GalleryCardAdmin
              key={drawing.ID}
              drawing={drawing}
              onClickOpen={() => setFullscreenIndex(index)}
            />
          ) : (
            <GalleryCardUser
              key={drawing.ID}
              drawing={drawing}
              onClick={() => setFullscreenIndex(index)}
            />
          )
        )}
      </div>
      <button className="loadMore" onClick={loadDrawings}>
        <Ellipsis size={20} strokeWidth={2} />
      </button>

      {fullscreenIndex !== null && currentDrawing && (
        <div className="fullscreenOverlay">
          <button className="navButton left" onClick={showPrev}>
            &lt;
          </button>
          <img
            src={"http://localhost:3000/api/portraits/" + currentDrawing.Source}
            alt={currentDrawing.Name}
          />
          <div className="fullscreenComments">
            <Comments drawingId={currentDrawing.ID} />
          </div>
          <button className="navButton right" onClick={showNext}>
            &gt;
          </button>
          <button className="closeButton" onClick={() => setFullscreenIndex(null)}>×</button>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
