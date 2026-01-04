import { useState, useCallback } from "react";
import { ParticleViewer } from "@/components/ParticleViewer";
import { useTemplates, useDeleteTemplate } from "@/hooks/use-templates";
import { useShapeDescriptions, useUpdateShapeDescription } from "@/hooks/use-shape-descriptions";
import { GlassCard } from "@/components/GlassCard";
import { UploadButton } from "@/components/UploadButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Atom, Grid, Activity, CircleDot, Waves, Box, Pyramid, Tornado, Flower2, Stars, Heart, Droplets, Infinity, Zap, Cloud, Dices, Hexagon, Repeat2, Triangle, Sparkles, Cylinder, BarChart3, TrendingUp, Layers, Network, Wind, Edit2, ChevronLeft, ChevronRight, Bold, Italic, List, ListOrdered, ImageIcon, Link as LinkIcon, Type, Palette, ArrowUpCircle, ArrowDownCircle, Underline as UnderlineIcon, AlignLeft, AlignCenter, AlignRight, Subscript as SubscriptIcon, Superscript as SuperscriptIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Standard preset definitions with icons
const PRESETS = [
  { id: 'sphere', name: 'Sphere', icon: Atom },
  { id: 'grid', name: 'Grid', icon: Grid },
  { id: 'helix', name: 'DNA Helix', icon: Activity },
  { id: 'torus', name: 'Torus', icon: CircleDot },
  { id: 'wave', name: 'Wave', icon: Waves },
  { id: 'cube', name: 'Cube', icon: Box },
  { id: 'pyramid', name: 'Pyramid', icon: Pyramid },
  { id: 'spiral', name: 'Spiral', icon: Tornado },
  { id: 'flower', name: 'Flower', icon: Flower2 },
  { id: 'galaxy', name: 'Galaxy', icon: Stars },
  { id: 'heart', name: 'Heart', icon: Heart },
  { id: 'fountain', name: 'Fountain', icon: Droplets },
  { id: 'doublehelix', name: 'Double Helix', icon: Infinity },
  { id: 'vortex', name: 'Vortex', icon: Zap },
  { id: 'nebula', name: 'Nebula', icon: Cloud },
  { id: 'octahedron', name: 'Octahedron', icon: Dices },
  { id: 'icosahedron', name: 'Icosahedron', icon: Hexagon },
  { id: 'mobius', name: 'Möbius Strip', icon: Repeat2 },
  { id: 'cone', name: 'Cone', icon: Triangle },
  { id: 'starburst', name: 'Starburst', icon: Sparkles },
  { id: 'cylinder', name: 'Cylinder', icon: Cylinder },
  { id: 'bars', name: 'Bar Chart', icon: BarChart3 },
  { id: 'curve', name: 'Bezier Curve', icon: TrendingUp },
  { id: 'layers', name: 'Layers', icon: Layers },
  { id: 'network', name: 'Network', icon: Network },
  { id: 'rings', name: 'Rings', icon: Wind },
];

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const url = window.prompt('URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setTextColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    editor.chain().focus().setColor(e.target.value).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-black/40 mb-4 rounded-t-lg items-center">
      <div className="flex items-center space-x-1 border-r border-white/10 pr-2 mr-2">
        <Select
          onValueChange={(value) => editor.chain().focus().setHeading({ level: parseInt(value) as any }).run()}
        >
          <SelectTrigger className="w-[100px] h-8 bg-black/40 border-none text-[10px] uppercase font-bold">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-primary/30">
            <SelectItem value="1">Heading 1</SelectItem>
            <SelectItem value="2">Heading 2</SelectItem>
            <SelectItem value="3">Heading 3</SelectItem>
            <SelectItem value="0">Normal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-1 border-r border-white/10 pr-2 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-primary/20 text-primary h-8 w-8' : 'h-8 w-8'}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-primary/20 text-primary h-8 w-8' : 'h-8 w-8'}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-primary/20 text-primary h-8 w-8' : 'h-8 w-8'}
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-1 border-r border-white/10 pr-2 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-primary/20 text-primary h-8 w-8' : 'h-8 w-8'}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-primary/20 text-primary h-8 w-8' : 'h-8 w-8'}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-primary/20 text-primary h-8 w-8' : 'h-8 w-8'}
        >
          <AlignRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-1 border-r border-white/10 pr-2 mr-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-primary/20 text-primary h-8 w-8' : 'h-8 w-8'}
        >
          <List className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-1 border-r border-white/10 pr-2 mr-2">
        <div className="relative group flex items-center">
          <input
            type="color"
            onInput={setTextColor}
            value={editor.getAttributes('textStyle').color || '#ffffff'}
            className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
          />
          <Palette className="w-3 h-3 text-muted-foreground absolute -right-1 pointer-events-none" />
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={addImage} className="h-8 w-8">
        <ImageIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default function Home() {
  const [activeMode, setActiveMode] = useState<string>('sphere');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState<number | null>(null);
  const [editingShape, setEditingShape] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const [panelSize, setPanelSize] = useState({ width: 320, height: 400 });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm max-w-none focus:outline-none min-h-[300px] p-6 text-white bg-black/20',
      },
    },
  });

  const { data: templates = [], isLoading } = useTemplates();
  const { mutate: deleteTemplate, isPending: isDeleting } = useDeleteTemplate();
  const { data: descriptions = [] } = useShapeDescriptions();
  const { mutate: updateDescription, isPending: isUpdating } = useUpdateShapeDescription();

  const getShapeDescription = (shapeId: string) => {
    return descriptions.find(d => d.shapeId === shapeId);
  };

  const openEditDialog = (shapeId: string, defaultTitle?: string) => {
    const existing = getShapeDescription(shapeId);
    const preset = PRESETS.find(p => p.id === shapeId);
    setEditingShape(shapeId);
    setEditTitle(existing?.title || defaultTitle || preset?.name || '');
    editor?.commands.setContent(existing?.description || '');
  };

  const handleSaveDescription = () => {
    if (editingShape && editor) {
      updateDescription({
        shapeId: editingShape,
        title: editTitle,
        description: editor.getHTML(),
      }, {
        onSuccess: () => {
          setEditingShape(null);
        },
      });
    }
  };

  const getCurrentShapeDescription = () => {
    if (activeMode === 'custom' && activeTemplateId) {
      return getShapeDescription(`template-${activeTemplateId}`);
    }
    return getShapeDescription(activeMode);
  };

  const getCurrentShapeTitle = () => {
    if (activeMode === 'custom' && activeTemplateId) {
      const template = templates.find(t => t.id === activeTemplateId);
      const desc = getShapeDescription(`template-${activeTemplateId}`);
      return desc?.title || template?.name || 'Custom Shape';
    }
    const preset = PRESETS.find(p => p.id === activeMode);
    const desc = getShapeDescription(activeMode);
    return desc?.title || preset?.name || activeMode;
  };

  const handlePresetClick = (mode: string) => {
    setActiveMode(mode);
    setCustomImage(null);
    setActiveTemplateId(null);
  };

  const handleTemplateClick = (template: any) => {
    setActiveMode('custom');
    setCustomImage(template.imageUrl);
    setActiveTemplateId(template.id);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* 3D Background - Now transitions smoothly without re-mounting */}
      <ParticleViewer 
        mode={activeMode} 
        customImageData={customImage} 
      />

      {/* Floating Description Card - Independent of side panels */}
      <AnimatePresence>
        {getCurrentShapeDescription() && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%", left: "50%", top: "50%" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            drag
            dragMomentum={false}
            style={{ 
              width: panelSize.width, 
              height: panelSize.height,
              position: "fixed",
              zIndex: 100,
              pointerEvents: "auto"
            }}
            className="cursor-move shadow-2xl"
          >
            <GlassCard className="flex flex-col h-full overflow-hidden w-full border-primary/40 backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-3 flex-shrink-0 p-4 border-b border-white/10">
                <h3 className="text-sm font-bold text-primary uppercase tracking-wider select-none">Information</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const shapeId = activeMode === 'custom' && activeTemplateId ? `template-${activeTemplateId}` : activeMode;
                      const template = activeTemplateId ? templates.find(t => t.id === activeTemplateId) : null;
                      openEditDialog(shapeId, template?.name);
                    }}
                    className="p-1.5 rounded hover:bg-primary/20 text-primary/60 hover:text-primary transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <ScrollArea className="flex-1 cursor-default p-4">
                <div 
                  className="prose prose-invert prose-sm max-w-none text-xs text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: getCurrentShapeDescription()?.description || '' }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </ScrollArea>
              {/* Resize Handles */}
              <div 
                className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize flex items-center justify-center z-50 group"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const startWidth = panelSize.width;
                  const startHeight = panelSize.height;
                  const startX = e.clientX;
                  const startY = e.clientY;

                  const onMouseMove = (moveEvent: MouseEvent) => {
                    setPanelSize({
                      width: Math.max(250, startWidth + (moveEvent.clientX - startX)),
                      height: Math.max(200, startHeight + (moveEvent.clientY - startY)),
                    });
                  };

                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                }}
              >
                <div className="w-3 h-3 border-r-2 border-b-2 border-primary/40 group-hover:border-primary transition-colors" />
              </div>
              {/* Bottom Edge Resize (Vertical Only) */}
              <div 
                className="absolute bottom-0 left-0 right-8 h-2 cursor-ns-resize hover:bg-primary/10 transition-colors"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const startHeight = panelSize.height;
                  const startY = e.clientY;
                  const onMouseMove = (moveEvent: MouseEvent) => {
                    setPanelSize(prev => ({ ...prev, height: Math.max(200, startHeight + (moveEvent.clientY - startY)) }));
                  };
                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };
                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                }}
              />
              {/* Right Edge Resize (Horizontal Only) */}
              <div 
                className="absolute top-0 right-0 bottom-8 w-2 cursor-ew-resize hover:bg-primary/10 transition-colors"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  const startWidth = panelSize.width;
                  const startX = e.clientX;
                  const onMouseMove = (moveEvent: MouseEvent) => {
                    setPanelSize(prev => ({ ...prev, width: Math.max(250, startWidth + (moveEvent.clientX - startX)) }));
                  };
                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };
                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                }}
              />
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UI Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none p-4 md:p-8 flex justify-between items-start h-full overflow-hidden">
        
        {/* Left Panel: Info */}
        <div 
          className="flex items-start h-full"
        >
          <AnimatePresence initial={false}>
            {!leftPanelCollapsed && (
              <motion.div 
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="w-full md:w-80 pointer-events-auto space-y-4 flex flex-col h-full overflow-hidden"
              >
                <GlassCard className="flex-shrink-0">
                  <h1 className="text-3xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                    Mr.OSKAR
                  </h1>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground font-mono">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span>SYSTEM ONLINE</span>
                  </div>
                  
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-sm border-b border-primary/20 pb-2">
                      <span className="text-primary">Current Mode</span>
                      <span className="font-bold uppercase tracking-wider">{getCurrentShapeTitle()}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-primary/20 pb-2">
                      <span className="text-primary">Particles</span>
                      <span className="font-mono">20,000</span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
            className="pointer-events-auto p-2 bg-black/40 border border-white/10 rounded-r-lg hover:bg-primary/20 transition-colors mt-4 h-12 flex items-center justify-center backdrop-blur-md"
          >
            {leftPanelCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        {/* Right Panel: Controls */}
        <div 
          className="flex items-start h-full group/right"
          onMouseEnter={() => setRightPanelCollapsed(false)}
          onMouseLeave={() => setRightPanelCollapsed(true)}
        >
          <div className="pointer-events-auto p-2 bg-black/40 border border-white/10 rounded-l-lg hover:bg-primary/20 transition-colors mt-4 h-12 flex items-center justify-center backdrop-blur-md opacity-50 group-hover/right:opacity-100">
            {rightPanelCollapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </div>
          <AnimatePresence initial={false}>
            {!rightPanelCollapsed && (
              <motion.div 
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                className="w-full md:w-96 pointer-events-auto flex flex-col h-full overflow-hidden"
              >
                <GlassCard className="flex flex-col h-full overflow-hidden p-0">
                  <div className="p-4 border-b border-white/10 bg-black/20">
                    <h2 className="font-display font-bold text-lg tracking-widest text-primary">SHAPE DATABASE</h2>
                  </div>

                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-6">
                      
                      {/* Standard Presets */}
                      <div>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 px-1">Standard Models</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {PRESETS.map((preset) => {
                            return (
                              <div key={preset.id} className="relative group">
                                <button
                                  onClick={() => handlePresetClick(preset.id)}
                                  className={`
                                    w-full flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200
                                    ${activeMode === preset.id 
                                      ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(0,255,204,0.3)]' 
                                      : 'bg-black/40 border-white/10 hover:border-primary/50 hover:bg-white/5'}
                                  `}
                                >
                                  <preset.icon 
                                    className={`w-6 h-6 mb-2 transition-colors ${activeMode === preset.id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} 
                                  />
                                  <span className="text-[10px] uppercase font-bold tracking-wider">{preset.name}</span>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditDialog(preset.id);
                                  }}
                                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/80 hover:bg-primary p-1 rounded-full"
                                  title="Edit description"
                                >
                                  <Edit2 className="w-3 h-3" />
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Custom Templates */}
                      <div>
                        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3 px-1 flex justify-between items-center">
                          <span>User Scans</span>
                        </h3>
                        
                          <div className="grid grid-cols-2 gap-2">
                            <AnimatePresence>
                              {templates.map((template) => (
                                <motion.div
                                  key={template.id}
                                  layout
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  className={`
                                    relative rounded-lg overflow-hidden border cursor-pointer group h-24
                                    ${activeMode === 'custom' && activeTemplateId === template.id
                                      ? 'border-accent shadow-[0_0_15px_rgba(119,0,255,0.4)]' 
                                      : 'border-white/10 hover:border-accent/50'}
                                  `}
                                  onClick={() => handleTemplateClick(template)}
                                >
                                  <img 
                                    src={template.imageUrl} 
                                    alt={template.name}
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                  
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openEditDialog(`template-${template.id}`, template.name);
                                      }}
                                      className="p-2 bg-primary/80 hover:bg-primary rounded-full transition-colors"
                                      title="Edit description"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                
                                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                                  <span className="text-xs font-bold truncate">{template.name}</span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-muted-foreground hover:text-red-500 hover:bg-red-500/20 -mr-1 -mb-1"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteTemplate(template.id);
                                    }}
                                    disabled={isDeleting}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>

                  <div className="p-4 bg-black/40 border-t border-white/10 backdrop-blur-xl">
                    <UploadButton />
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Edit Description Dialog */}
      <Dialog open={!!editingShape} onOpenChange={(open) => !open && setEditingShape(null)}>
        <DialogContent className="max-w-3xl bg-black/95 border-primary/30 text-white backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl font-display uppercase tracking-widest">Editor Shape Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div>
              <Label htmlFor="title" className="text-primary text-xs uppercase font-bold tracking-tighter">Shape Title</Label>
              <Input
                id="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="bg-black/50 border-white/10 text-white mt-2 h-12 focus:ring-primary/50"
                placeholder="Enter shape name..."
              />
            </div>
            <div>
              <Label className="text-primary text-xs uppercase font-bold tracking-tighter">Description (Rich Text)</Label>
              <div className="mt-2 border border-white/10 rounded-lg overflow-hidden bg-black/50 focus-within:border-primary/50 transition-colors">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="ghost" onClick={() => setEditingShape(null)} className="hover:bg-white/5">Cancel</Button>
            <Button 
              onClick={handleSaveDescription} 
              disabled={isUpdating}
              className="bg-primary hover:bg-primary/80 text-black font-bold uppercase tracking-widest px-8"
            >
              {isUpdating ? 'Transmitting...' : 'Save Data'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
