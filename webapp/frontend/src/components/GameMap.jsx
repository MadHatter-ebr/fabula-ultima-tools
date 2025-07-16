import React, { useState, useRef, useEffect } from 'react';
import './GameMap.css';

const GameMap = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('pen');
  const [penColor, setPenColor] = useState('#000000');
  const [penSize, setPenSize] = useState(3);
  const [mapData, setMapData] = useState({
    tokens: [],
    annotations: [],
    gridSize: 30,
    showGrid: true,
    backgroundImage: null
  });
  const [selectedToken, setSelectedToken] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const tools = {
    pen: { name: 'Pen', icon: '✏️' },
    eraser: { name: 'Eraser', icon: '🧹' },
    token: { name: 'Add Token', icon: '🚶' },
    text: { name: 'Add Text', icon: '📝' },
    measure: { name: 'Measure', icon: '📏' },
    select: { name: 'Select', icon: '👆' }
  };

  const tokenTypes = {
    pc: { name: 'Player Character', color: '#3498db', size: 20 },
    npc: { name: 'NPC', color: '#2ecc71', size: 20 },
    enemy: { name: 'Enemy', color: '#e74c3c', size: 20 },
    boss: { name: 'Boss', color: '#8e44ad', size: 30 },
    object: { name: 'Object', color: '#f39c12', size: 15 }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 800;
    canvas.height = 600;
    
    redrawCanvas();
  }, [mapData]);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background image if exists
    if (mapData.backgroundImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawMapElements(ctx);
      };
      img.src = mapData.backgroundImage;
    } else {
      drawMapElements(ctx);
    }
  };

  const drawMapElements = (ctx) => {
    // Draw grid
    if (mapData.showGrid) {
      drawGrid(ctx);
    }

    // Draw annotations (drawings)
    mapData.annotations.forEach(annotation => {
      drawAnnotation(ctx, annotation);
    });

    // Draw tokens
    mapData.tokens.forEach(token => {
      drawToken(ctx, token);
    });
  };

  const drawGrid = (ctx) => {
    const { gridSize } = mapData;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    const canvas = canvasRef.current;
    
    // Vertical lines
    for (let x = 0; x <= canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  const drawAnnotation = (ctx, annotation) => {
    if (annotation.type === 'drawing') {
      ctx.strokeStyle = annotation.color;
      ctx.lineWidth = annotation.size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      annotation.points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      ctx.stroke();
    } else if (annotation.type === 'text') {
      ctx.fillStyle = annotation.color;
      ctx.font = `${annotation.size}px Arial`;
      ctx.fillText(annotation.text, annotation.x, annotation.y);
    }
  };

  const drawToken = (ctx, token) => {
    const tokenType = tokenTypes[token.type];
    
    // Draw token circle
    ctx.beginPath();
    ctx.arc(token.x, token.y, tokenType.size, 0, 2 * Math.PI);
    ctx.fillStyle = tokenType.color;
    ctx.fill();
    
    // Draw border
    ctx.strokeStyle = token === selectedToken ? '#fff' : '#000';
    ctx.lineWidth = token === selectedToken ? 3 : 1;
    ctx.stroke();
    
    // Draw token label
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(token.name, token.x, token.y + 4);
    
    // Draw name below token
    ctx.fillStyle = '#000';
    ctx.font = '10px Arial';
    ctx.fillText(token.name, token.x, token.y + tokenType.size + 15);
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const snapToGrid = (x, y) => {
    if (!mapData.showGrid) return { x, y };
    
    const { gridSize } = mapData;
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize
    };
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);
    
    if (currentTool === 'pen') {
      setIsDrawing(true);
      const newAnnotation = {
        type: 'drawing',
        color: penColor,
        size: penSize,
        points: [pos]
      };
      setMapData(prev => ({
        ...prev,
        annotations: [...prev.annotations, newAnnotation]
      }));
    } else if (currentTool === 'token') {
      const snappedPos = snapToGrid(pos.x, pos.y);
      addToken(snappedPos);
    } else if (currentTool === 'select') {
      const clickedToken = findTokenAt(pos);
      if (clickedToken) {
        setSelectedToken(clickedToken);
        setIsDragging(true);
        setDragOffset({
          x: pos.x - clickedToken.x,
          y: pos.y - clickedToken.y
        });
      } else {
        setSelectedToken(null);
      }
    } else if (currentTool === 'text') {
      const text = prompt('Enter text:');
      if (text) {
        const newAnnotation = {
          type: 'text',
          text: text,
          x: pos.x,
          y: pos.y,
          color: penColor,
          size: penSize * 4
        };
        setMapData(prev => ({
          ...prev,
          annotations: [...prev.annotations, newAnnotation]
        }));
      }
    }
  };

  const handleMouseMove = (e) => {
    const pos = getMousePos(e);
    
    if (isDrawing && currentTool === 'pen') {
      setMapData(prev => {
        const newAnnotations = [...prev.annotations];
        const lastAnnotation = newAnnotations[newAnnotations.length - 1];
        if (lastAnnotation && lastAnnotation.type === 'drawing') {
          lastAnnotation.points.push(pos);
        }
        return {
          ...prev,
          annotations: newAnnotations
        };
      });
    } else if (isDragging && selectedToken) {
      const snappedPos = snapToGrid(pos.x - dragOffset.x, pos.y - dragOffset.y);
      setMapData(prev => ({
        ...prev,
        tokens: prev.tokens.map(token =>
          token === selectedToken 
            ? { ...token, x: snappedPos.x, y: snappedPos.y }
            : token
        )
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setIsDragging(false);
  };

  const findTokenAt = (pos) => {
    return mapData.tokens.find(token => {
      const tokenType = tokenTypes[token.type];
      const distance = Math.sqrt(
        Math.pow(pos.x - token.x, 2) + Math.pow(pos.y - token.y, 2)
      );
      return distance <= tokenType.size;
    });
  };

  const addToken = (pos) => {
    const tokenType = prompt('Token type (pc/npc/enemy/boss/object):') || 'pc';
    const tokenName = prompt('Token name:') || 'Token';
    
    if (tokenTypes[tokenType]) {
      const newToken = {
        id: Date.now(),
        name: tokenName,
        type: tokenType,
        x: pos.x,
        y: pos.y
      };
      
      setMapData(prev => ({
        ...prev,
        tokens: [...prev.tokens, newToken]
      }));
    }
  };

  const clearMap = () => {
    if (confirm('Clear all drawings and tokens?')) {
      setMapData(prev => ({
        ...prev,
        tokens: [],
        annotations: []
      }));
    }
  };

  const exportMap = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'fabula-ultima-map.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const loadBackgroundImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMapData(prev => ({
          ...prev,
          backgroundImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="game-map">
      <div className="map-header">
        <h2>🗺️ Interactive Game Map</h2>
        <p>Create and manage tactical maps for your Fabula Ultima sessions</p>
      </div>

      <div className="map-tools">
        <div className="tool-group">
          <label>Tool:</label>
          <div className="tool-buttons">
            {Object.entries(tools).map(([key, tool]) => (
              <button
                key={key}
                className={`tool-btn ${currentTool === key ? 'active' : ''}`}
                onClick={() => setCurrentTool(key)}
                title={tool.name}
              >
                {tool.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="tool-group">
          <label>Color:</label>
          <input
            type="color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
          />
        </div>

        <div className="tool-group">
          <label>Size:</label>
          <input
            type="range"
            min="1"
            max="20"
            value={penSize}
            onChange={(e) => setPenSize(parseInt(e.target.value))}
          />
          <span>{penSize}</span>
        </div>

        <div className="tool-group">
          <label>Grid:</label>
          <input
            type="checkbox"
            checked={mapData.showGrid}
            onChange={(e) => setMapData(prev => ({ ...prev, showGrid: e.target.checked }))}
          />
        </div>

        <div className="tool-group">
          <label>Grid Size:</label>
          <input
            type="range"
            min="10"
            max="50"
            value={mapData.gridSize}
            onChange={(e) => setMapData(prev => ({ ...prev, gridSize: parseInt(e.target.value) }))}
          />
          <span>{mapData.gridSize}</span>
        </div>
      </div>

      <div className="map-actions">
        <input
          type="file"
          accept="image/*"
          onChange={loadBackgroundImage}
          style={{ display: 'none' }}
          id="background-upload"
        />
        <label htmlFor="background-upload" className="action-btn">
          🖼️ Load Background
        </label>
        <button onClick={clearMap} className="action-btn">
          🗑️ Clear Map
        </button>
        <button onClick={exportMap} className="action-btn">
          💾 Export Map
        </button>
      </div>

      <div className="map-container">
        <canvas
          ref={canvasRef}
          className="map-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      <div className="map-legend">
        <h3>Token Types</h3>
        <div className="legend-items">
          {Object.entries(tokenTypes).map(([key, type]) => (
            <div key={key} className="legend-item">
              <div 
                className="legend-color"
                style={{ backgroundColor: type.color }}
              ></div>
              <span>{type.name}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedToken && (
        <div className="token-info">
          <h3>Selected Token</h3>
          <p><strong>Name:</strong> {selectedToken.name}</p>
          <p><strong>Type:</strong> {tokenTypes[selectedToken.type].name}</p>
          <p><strong>Position:</strong> ({selectedToken.x}, {selectedToken.y})</p>
          <button 
            onClick={() => {
              setMapData(prev => ({
                ...prev,
                tokens: prev.tokens.filter(token => token !== selectedToken)
              }));
              setSelectedToken(null);
            }}
            className="remove-token-btn"
          >
            Remove Token
          </button>
        </div>
      )}

      <div className="map-info">
        <h3>Instructions</h3>
        <ul>
          <li><strong>Pen:</strong> Click and drag to draw</li>
          <li><strong>Token:</strong> Click to place a token</li>
          <li><strong>Select:</strong> Click to select and drag tokens</li>
          <li><strong>Text:</strong> Click to add text labels</li>
          <li><strong>Grid:</strong> Toggle grid visibility and adjust size</li>
        </ul>
      </div>
    </div>
  );
};

export default GameMap;