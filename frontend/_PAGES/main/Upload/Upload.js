'use client'

import { useState, useRef, useCallback } from 'react'
import { useIdioma } from '@/_EXTRAS/Idiomas/IdiomasContext'
import styles from './Upload.module.css'

const CATEGORIES = [
  'Amateur', 'Anal', 'Asian', 'BBC', 'BBW', 'Big Ass', 'Big Dick',
  'Big Tits', 'Bisexual', 'Blonde', 'Blowjob', 'Brunette', 'Bukkake',
  'Compilation', 'Cosplay', 'Creampie', 'Cuckold', 'Cumshot',
  'Dark Skin', 'DP', 'Ebony', 'Euro', 'Facial', 'Feet', 'Fetish',
  'Fingering', 'Fisting', 'Gangbang', 'Gaping', 'German',
  'Group Sex', 'Handjob', 'Hardcore', 'Hentai', 'Homemade',
  'Indian', 'Interracial', 'Japanese', 'Latina', 'Lesbian',
  'Massage', 'Masturbation', 'Mature', 'MILF', 'Oral', 'Orgy',
  'Pissing', 'POV', 'Public', 'Pussy Licking', 'Red Head',
  'Rimming', 'Romantic', 'Russian', 'Shemale', 'Small Tits',
  'Squirt', 'Step Fantasy', 'Straight', 'Strap On', 'Teen',
  'Threesome', 'Toys', 'Trans', 'Vintage', 'Webcam', 'Young',
]

const TAGS = [
  'xxx', 'big cock', 'hardcore', 'vr', 'handjob', 'latina', 'latin', 'big dick',
  'pov', 'big ass', 'solo', 'pawg', 'creampie', 'webcam', 'missionary', 'doggystyle',
  'lingerie', 'facial', 'oral', 'asian', 'shemale', 'threesome', 'porn', 'pussy',
  'big tits', 'bigass', 'sex', 'amateur', 'ass', 'teen', 'milf', 'blowjob',
  'cumshot', 'babe', 'anal', 'fuck', 'petite', 'blonde', 'fingering', 'deepthroat',
  'masturbation', 'bbc',
]

export default function Upload() {
  const { t } = useIdioma()
  const [tab, setTab] = useState('video')

  return (
    <div className={styles.page}>
      <div className={styles.tabs}>
        <button type="button" className={`${styles.tab} ${tab === 'video' ? styles.tabActive : ''}`} onClick={() => setTab('video')}>
          <ion-icon name="videocam-outline" class={styles.tabIcon}></ion-icon>
          <span>{t('upload.video')}</span>
        </button>
        <button type="button" className={`${styles.tab} ${styles.tabHidden} ${tab === 'album' ? styles.tabActive : ''}`} onClick={() => setTab('album')}>
          <ion-icon name="images-outline" class={styles.tabIcon}></ion-icon>
          <span>{t('upload.album')}</span>
        </button>
        <button type="button" className={`${styles.tab} ${styles.tabHidden} ${tab === 'model' ? styles.tabActive : ''}`} onClick={() => setTab('model')}>
          <ion-icon name="person-outline" class={styles.tabIcon}></ion-icon>
          <span>{t('upload.model')}</span>
        </button>
      </div>

      {tab === 'video' && <VideoUpload t={t} CATEGORIES={CATEGORIES} TAGS={TAGS} />}
      {tab === 'album' && <AlbumUpload t={t} CATEGORIES={CATEGORIES} TAGS={TAGS} />}
      {tab === 'model' && <ModelUpload t={t} TAGS={TAGS} />}
    </div>
  )
}

function VideoUpload({ t, CATEGORIES, TAGS }) {
  const [files, setFiles] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const inputRef = useRef(null)

  const handleFiles = useCallback((incoming) => {
    const valid = Array.from(incoming).filter((f) => f.type.startsWith('video/'))
    setFiles(valid.slice(0, 1))
  }, [])

  function onDrop(e) { e.preventDefault(); setDragOver(false); if (e.dataTransfer?.files) handleFiles(e.dataTransfer.files) }
  function onDragOver(e) { e.preventDefault(); setDragOver(true) }
  function onDragLeave() { setDragOver(false) }
  function onFileSelect(e) { if (e.target?.files) handleFiles(e.target.files); e.target.value = '' }
  function removeFile() { setFiles([]) }

  function toggleTag(tag) {
    setSelectedTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag])
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1048576).toFixed(1) + ' MB'
  }

  function simulate() {
    setUploading(true); setProgress(0)
    const interval = setInterval(() => { setProgress((p) => { if (p >= 100) { clearInterval(interval); return 100 } return p + 5 }) }, 200)
    setTimeout(() => { clearInterval(interval); setProgress(100); setTimeout(() => { setUploading(false); setProgress(0); setFiles([]); setTitle(''); setDescription(''); setCategory(''); setSelectedTags([]) }, 600) }, 2000)
  }

  function handleSubmit(e) { e.preventDefault(); if (files.length === 0 || !title) return; simulate() }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.twoCol}>
        <div className={styles.colLeft}>
          <div className={`${styles.dropZone} ${dragOver ? styles.dropZoneActive : ''}`}
            onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
            onClick={() => inputRef.current?.click()}
          >
            <input ref={inputRef} type="file" hidden accept="video/*" onChange={onFileSelect} />
            <ion-icon name="cloud-upload-outline" class={styles.dropIcon}></ion-icon>
            <p className={styles.dropText}>{t('upload.dropVideos')}</p>
            <span className={styles.dropHint}>{t('upload.videoFormats')}</span>
          </div>

          {files.length > 0 && (
            <div className={styles.previewCard}>
              <div className={styles.previewRow}>
                <ion-icon name="videocam-outline" class={styles.previewIcon}></ion-icon>
                <div className={styles.previewMeta}>
                  <span className={styles.previewName}>{files[0].name}</span>
                  <span className={styles.previewSize}>{formatSize(files[0].size)}</span>
                </div>
                <button type="button" className={styles.removeBtn} onClick={removeFile}>
                  <ion-icon name="close-outline" class={styles.removeIcon}></ion-icon>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.colRight}>
          <div className={styles.card}>
            <div className={styles.field}>
              <label className={styles.label}>{t('upload.title')}</label>
              <input type="text" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('upload.titlePlaceholder')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t('upload.description')}</label>
              <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('upload.descriptionPlaceholder')} rows={3} />
            </div>
            <div className={styles.inlineRow}>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.category')}</label>
                <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">{t('upload.categoryPlaceholder')}</option>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>{t('upload.tags')}</div>
            <div className={styles.tagPicker}>
              {TAGS.map((tag) => (
                <button type="button" key={tag} className={`${styles.tagBtn} ${selectedTags.includes(tag) ? styles.tagBtnActive : ''}`} onClick={() => toggleTag(tag)}>{tag}</button>
              ))}
            </div>
          </div>

          {uploading && (
            <div className={styles.progressWrap}>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${progress}%` }} /></div>
              <span className={styles.progressText}>{progress}%</span>
            </div>
          )}

          <div className={styles.submitRow}>
            <button type="submit" className={styles.submitBtn} disabled={files.length === 0 || !title || uploading}>
              {uploading ? t('upload.uploading') : t('upload.upload')}
            </button>
            {files.length === 0 && <span className={styles.submitHint}>{t('upload.selectVideoHint')}</span>}
          </div>
        </div>
      </div>
    </form>
  )
}

function AlbumUpload({ t, CATEGORIES, TAGS }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [models, setModels] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [coverFile, setCoverFile] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const coverRef = useRef(null)
  const photosRef = useRef(null)

  function handleCover(e) {
    const f = e.target?.files?.[0]
    if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)) }
    e.target.value = ''
  }

  const handlePhotos = useCallback((incoming) => {
    const valid = Array.from(incoming).filter((f) => f.type.startsWith('image/'))
    setPhotos((prev) => [...prev, ...valid].slice(0, 50))
  }, [])

  function onDrop(e) { e.preventDefault(); setDragOver(false); if (e.dataTransfer?.files) handlePhotos(e.dataTransfer.files) }
  function onDragOver(e) { e.preventDefault(); setDragOver(true) }
  function onDragLeave() { setDragOver(false) }
  function onFileSelect(e) { if (e.target?.files) handlePhotos(e.target.files); e.target.value = '' }
  function removePhoto(i) { setPhotos((prev) => prev.filter((_, idx) => idx !== i)) }

  function toggleTag(tag) {
    setSelectedTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag])
  }

  function simulate() {
    setUploading(true); setProgress(0)
    const interval = setInterval(() => { setProgress((p) => { if (p >= 100) { clearInterval(interval); return 100 } return p + 5 }) }, 200)
    setTimeout(() => { clearInterval(interval); setProgress(100); setTimeout(() => { setUploading(false); setProgress(0); setPhotos([]); setCoverFile(null); setCoverPreview(null); setName(''); setDescription(''); setCategory(''); setModels(''); setSelectedTags([]) }, 600) }, 2000)
  }

  function handleSubmit(e) { e.preventDefault(); if (!name || photos.length === 0) return; simulate() }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.twoCol}>
        <div className={styles.colLeft}>
          <div className={styles.field}>
            <label className={styles.label}>{t('upload.coverImage')}</label>
            <div className={styles.coverUpload} onClick={() => coverRef.current?.click()}>
              <input ref={coverRef} type="file" hidden accept="image/*" onChange={handleCover} />
              {coverPreview ? (
                <img src={coverPreview} alt="" className={styles.coverPreview} />
              ) : (
                <>
                  <ion-icon name="image-outline" class={styles.coverIcon}></ion-icon>
                  <span className={styles.coverHint}>{t('upload.clickToUpload')}</span>
                </>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('upload.photos')}</label>
            <div className={`${styles.photoDrop} ${dragOver ? styles.photoDropActive : ''}`}
              onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
              onClick={() => photosRef.current?.click()}
            >
              <input ref={photosRef} type="file" hidden multiple accept="image/*" onChange={onFileSelect} />
              <ion-icon name="images-outline" class={styles.photoDropIcon}></ion-icon>
              <span className={styles.photoDropText}>{t('upload.dropPhotos')}</span>
            </div>
            {photos.length > 0 && (
              <>
                <div className={styles.photoGrid}>
                  {photos.map((f, i) => (
                    <div key={i} className={styles.photoThumb}>
                      <img src={URL.createObjectURL(f)} alt="" className={styles.thumbImg} />
                      <button type="button" className={styles.thumbRemove} onClick={() => removePhoto(i)}>
                        <ion-icon name="close-outline" class={styles.removeIcon}></ion-icon>
                      </button>
                    </div>
                  ))}
                </div>
                <span className={styles.photoCount}>{photos.length} {t('upload.photosSelected')}</span>
              </>
            )}
          </div>
        </div>

        <div className={styles.colRight}>
          <div className={styles.card}>
            <div className={styles.field}>
              <label className={styles.label}>{t('upload.albumName')}</label>
              <input type="text" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder={t('upload.albumNamePlaceholder')} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t('upload.description')}</label>
              <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('upload.descriptionPlaceholder')} rows={3} />
            </div>
            <div className={styles.inlineRow}>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.category')}</label>
                <select className={styles.select} value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">{t('upload.categoryPlaceholder')}</option>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.models')}</label>
                <input type="text" className={styles.input} value={models} onChange={(e) => setModels(e.target.value)} placeholder={t('upload.modelsPlaceholder')} />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>{t('upload.tags')}</div>
            <div className={styles.tagPicker}>
              {TAGS.map((tag) => (
                <button type="button" key={tag} className={`${styles.tagBtn} ${selectedTags.includes(tag) ? styles.tagBtnActive : ''}`} onClick={() => toggleTag(tag)}>{tag}</button>
              ))}
            </div>
          </div>

          {uploading && (
            <div className={styles.progressWrap}>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${progress}%` }} /></div>
              <span className={styles.progressText}>{progress}%</span>
            </div>
          )}

          <div className={styles.submitRow}>
            <button type="submit" className={styles.submitBtn} disabled={!name || photos.length === 0 || uploading}>
              {uploading ? t('upload.uploading') : t('upload.createAlbum')}
            </button>
            {(!name || photos.length === 0) && <span className={styles.submitHint}>{t('upload.albumRequiredHint')}</span>}
          </div>
        </div>
      </div>
    </form>
  )
}

function ModelUpload({ t, TAGS }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [bio, setBio] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [onlyfans, setOnlyfans] = useState('')
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [photos, setPhotos] = useState([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  function handleAvatar(e) {
    const f = e.target?.files?.[0]
    if (f) { setAvatarFile(f); setAvatarPreview(URL.createObjectURL(f)) }
    e.target.value = ''
  }

  function handlePhotos(e) {
    if (e.target?.files) {
      const valid = Array.from(e.target.files).filter((f) => f.type.startsWith('image/'))
      setPhotos((prev) => [...prev, ...valid].slice(0, 20))
    }
    e.target.value = ''
  }

  function removePhoto(i) { setPhotos((prev) => prev.filter((_, idx) => idx !== i)) }

  function toggleTag(tag) {
    setSelectedTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag])
  }

  function simulate() {
    setUploading(true); setProgress(0)
    const interval = setInterval(() => { setProgress((p) => { if (p >= 100) { clearInterval(interval); return 100 } return p + 5 }) }, 200)
    setTimeout(() => { clearInterval(interval); setProgress(100); setTimeout(() => { setUploading(false); setProgress(0); setName(''); setAge(''); setCountry(''); setCity(''); setHeight(''); setWeight(''); setBio(''); setFacebook(''); setInstagram(''); setTwitter(''); setOnlyfans(''); setAvatarFile(null); setAvatarPreview(null); setPhotos([]); setSelectedTags([]) }, 600) }, 2000)
  }

  function handleSubmit(e) { e.preventDefault(); if (!name) return; simulate() }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.twoCol}>
        <div className={styles.colLeft}>
          <div className={styles.field}>
            <label className={styles.label}>{t('upload.avatar')}</label>
            <div className={styles.avatarUpload} onClick={() => document.getElementById('model-avatar')?.click()}>
              <input id="model-avatar" type="file" hidden accept="image/*" onChange={handleAvatar} />
              {avatarPreview ? (
                <img src={avatarPreview} alt="" className={styles.avatarPreview} />
              ) : (
                <>
                  <ion-icon name="person-circle-outline" class={styles.avatarIcon}></ion-icon>
                  <span className={styles.avatarHint}>{t('upload.clickToUpload')}</span>
                </>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>{t('upload.photos')}</label>
            <input type="file" multiple accept="image/*" onChange={handlePhotos} className={styles.input} style={{ paddingTop: '0.5rem', height: 'auto' }} />
            {photos.length > 0 && (
              <div className={styles.modelPhotoGrid}>
                {photos.map((f, i) => (
                  <div key={i} className={styles.modelPhotoThumb}>
                    <img src={URL.createObjectURL(f)} alt="" className={styles.thumbImg} />
                    <button type="button" className={styles.thumbRemove} onClick={() => removePhoto(i)}>
                      <ion-icon name="close-outline" class={styles.removeIcon}></ion-icon>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.colRight}>
          <div className={styles.card}>
            <div className={styles.inlineRow}>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.modelName')}</label>
                <input type="text" className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Lana Rhoades" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.age')}</label>
                <input type="text" className={styles.input} value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 27" />
              </div>
            </div>
            <div className={styles.inlineRow}>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.country')}</label>
                <input type="text" className={styles.input} value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. United States" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.city')}</label>
                <input type="text" className={styles.input} value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Los Angeles" />
              </div>
            </div>
            <div className={styles.inlineRow}>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.height')}</label>
                <input type="text" className={styles.input} value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 165cm" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>{t('upload.weight')}</label>
                <input type="text" className={styles.input} value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 55kg" />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>{t('upload.bio')}</label>
              <textarea className={styles.textarea} value={bio} onChange={(e) => setBio(e.target.value)} placeholder={t('upload.bioPlaceholder')} rows={3} />
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>{t('upload.socialNetworks')}</div>
            <div className={styles.socialGrid}>
              <div className={styles.socialField}>
                <label>Facebook</label>
                <input type="text" className={styles.input} value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="URL or @username" />
              </div>
              <div className={styles.socialField}>
                <label>Instagram</label>
                <input type="text" className={styles.input} value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="URL or @username" />
              </div>
              <div className={styles.socialField}>
                <label>Twitter / X</label>
                <input type="text" className={styles.input} value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="URL or @username" />
              </div>
              <div className={styles.socialField}>
                <label>OnlyFans</label>
                <input type="text" className={styles.input} value={onlyfans} onChange={(e) => setOnlyfans(e.target.value)} placeholder="URL or @username" />
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardTitle}>{t('upload.tags')}</div>
            <div className={styles.tagPicker}>
              {TAGS.map((tag) => (
                <button type="button" key={tag} className={`${styles.tagBtn} ${selectedTags.includes(tag) ? styles.tagBtnActive : ''}`} onClick={() => toggleTag(tag)}>{tag}</button>
              ))}
            </div>
          </div>

          {uploading && (
            <div className={styles.progressWrap}>
              <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${progress}%` }} /></div>
              <span className={styles.progressText}>{progress}%</span>
            </div>
          )}

          <div className={styles.submitRow}>
            <button type="submit" className={styles.submitBtn} disabled={!name || uploading}>
              {uploading ? t('upload.uploading') : t('upload.createModel')}
            </button>
            {!name && <span className={styles.submitHint}>{t('upload.modelRequiredHint')}</span>}
          </div>
        </div>
      </div>
    </form>
  )
}
