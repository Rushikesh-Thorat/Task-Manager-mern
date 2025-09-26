import React from 'react'

const AvatarGroup = ({avatars, maxVisible = 3}) => {
  const visibleAvatars = React.useMemo(
    () => {
      return avatars.slice(0, maxVisible)
    },
    [avatars, maxVisible]
  )

  return (
    <div className="flex items-center">
      {visibleAvatars.map((avatar, index) => (
        <img key={index} src={avatar} alt={`Avatar ${index}`} className="w-9 h-9 rounded-full -ml-3 border-2 border-white first:ml-0" />
      ))}
      {avatars.length > maxVisible && (
        <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center border-2 border-white -ml-3 justify-center text-sm font-medium text-black">
          +{avatars.length - maxVisible}
        </div>
      )}
    </div>
  )
}
export default AvatarGroup